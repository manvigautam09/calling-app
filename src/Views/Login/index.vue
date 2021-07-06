<template>
  <div className="vue-tempalte">
    <form className="inner-block">
      <h3>Sign In</h3>

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
        Sign In
      </button>

      <p className="login-signUp-link">
        <router-link to="/signup">Register</router-link>
      </p>

      <!--       
      <p className="forgot-password">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p> -->

      <!-- <div className="social-icons">
        <ul>
          <li>
            <a href="#"><i className="fa fa-google"></i></a>
          </li>
          <li>
            <a href="#"><i className="fa fa-facebook"></i></a>
          </li>
          <li>
            <a href="#"><i className="fa fa-twitter"></i></a>
          </li>
        </ul>
      </div> -->
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
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

/* .navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
} */

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

/* .forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554ff;
} */

/* .social-icons {
  text-align: center;
  font-family: 'Open Sans';
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
} */

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

/* .social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}
.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
} */
</style>
