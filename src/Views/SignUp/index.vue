<template>
  <div className="vue-tempalte">
    <form className="inner-block">
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>

      <button
        type="button"
        className="button-styles"
        @click="handleButtonClick"
      >
        Sign Up
      </button>

      <p className="login-signUp-link">
        <router-link to="/login">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {};
  },
  methods: {
    handleButtonClick(e) {
      console.log('###', e);
    }
  }
};
</script>

<style scoped>
.vue-tempalte {
  height: 95vh;
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
