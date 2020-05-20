<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <div class="message is-danger" v-if="requestStatus === 'FINISHED_ERROR'">
          <div class="message-body">{{requestError}}</div>
        </div>

<v-col cols="12" sm="12" md="12">
          <v-text-field
            label="Choose Username"
            placeholder="small caps without space"
            outlined
            v-model="identifier"
          ></v-text-field>
        </v-col>

<v-col cols="12" sm="12" md="12">
          <v-text-field
            label="Your Email"
            placeholder="make sure use valid address"
            outlined
            v-model="email" 
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

        <v-btn
        color="primary"
        type="submit"
        large
          :class="{'is-loading': requestStatus === 'PENDING'}"
          >Register</v-btn>
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
      requestStatus: "NOT_STARTED",
      signUpRequestError: null,
      identifier: "",
      password: "",
      email: "",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    onSubmit() {
      this.signUpRequestError = null;
      this.requestStatus = "PENDING";
      this.$store
        .dispatch("auth/register", {
          username: this.identifier,
          password: this.password,
          email: this.email
        })
        .then(response => {
          // if register is successfull, log the user in.
          this.requestStatus = "FINISHED_OK";
          const authData = {
            identifier: this.identifier,
            password: this.password
          };
          return this.$store.dispatch("auth/login", authData);
        })
        .then(r => {
          this.$emit("success");
        })
        .catch(e => {
          this.requestStatus = "FINISHED_ERROR";
          if (e.response.data.message) {
            this.requestError = e.response.data.message;
          } else {
            this.requestError = e.message;
          }
        });
    }
  }
};
</script>
