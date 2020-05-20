<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <div class="message is-danger" v-if="requestStatus === 'FINISHED_ERROR'">
          <div class="message-body">Authentication failed : {{requestError}}</div>
        </div>

<v-col cols="12" sm="12" md="12">
          <v-text-field
            label="Your Email"
            placeholder="or type your username.."
            outlined
            v-model="identifier"
          ></v-text-field>
        </v-col>


        <v-col cols="12" sm="12">
          <v-text-field
            outlined
            placeholder="*******"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Your Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-btn
            type="submit"
            large
            color="primary"
            :class="{'is-loading': requestStatus === 'PENDING'}"
          >Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Cookie from "js-cookie";
import axios from "axios";

export default {
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      requestStatus: "NOT_STARTED",
      requestError: null,
      identifier: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    onSubmit() {
      this.requestStatus = "PENDING";
      this.requestError = null;
      const authData = {
        identifier: this.identifier,
        password: this.password
      };
      this.$store
        .dispatch("auth/login", authData)
        .then(r => {
          this.requestStatus = "FINISHED_OK";
          this.$router.push("/private");
          this.$emit("success");
        })
        .catch(e => {
          this.requestStatus = "FINISHED_ERROR";
          if (e.response && e.response.data) {
            this.requestError = e.response.data.message;
          } else {
            this.requestError = e.message;
          }
        });
    }
  }
};
</script>
