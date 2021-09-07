<template>
  <div className="vue-tempalte">
    <form className="inner-block" @submit.prevent="handleButtonClick">
      <h3>Sign In</h3>

      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" v-model="email" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" v-model="password" />
      </div>

      <button
        type="submit"
        :className="
          isButtonDisabled ? 'disabled-button-styles' : 'button-styles'
        "
        :disabled="isButtonDisabled"
      >
        Sign In
      </button>

      <p className="login-signUp-link">
        <router-link to="/signup">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import * as fb from '../../firebase';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    isButtonDisabled() {
      let disabled = false;
      if (this.$data.email.length === 0 || this.$data.password.length === 0) {
        disabled = true;
      }
      return disabled;
    }
  },
  methods: {
    async handleButtonClick() {
      const { user } = await fb.auth.signInWithEmailAndPassword(
        this.$data.email,
        this.$data.password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/dashboard');
      }
    }
  }
};
</script>

<style scoped>
.vue-tempalte {
  height: 90vh;
  background-image: url('../../assets/icons/background.jpg');
  background-size: 90vh 95vw;
  padding-top: 30px;
  padding-bottom: 30px;
}

.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
  margin-top: 30px;
}

h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: 500;
}

.form-control {
  margin-bottom: 20px;
  margin-top: 10px;
  height: 35px;
  border: solid 1px lightgray;
  border-radius: 5px;
}

.button-styles {
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  align-items: center;
  justify-content: center;
  background-color: #3eb37f;
  border: solid 1px #3eb37f;
  height: 35px;
  cursor: pointer;
}
.disabled-button-styles {
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  align-items: center;
  justify-content: center;
  background-color: #72f7bb;
  border: solid 1px #72f7bb;
  height: 35px;
  cursor: not-allowed;
  color: gray;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.login-signUp-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
