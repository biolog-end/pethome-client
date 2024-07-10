import React, { useEffect, useState } from 'react';
import logo from './Assets/Img/logo.png';
import './Header.css';

const Header = () => {
  const [isAuthWindowActive, setAuthWindowActive] = useState(false);
  useEffect(() => {
    let lastScrollTop = 0;
    const header = document.getElementById('header');

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 60) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

      if (scrollTop > 50) {
        header.style.backgroundColor = 'rgba(242, 232, 223, 0.9)';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
      }
    };

    const menuToggle = document.createElement('button');
    menuToggle.textContent = '☰';
    menuToggle.classList.add('menu-toggle');

    const nav = document.querySelector('nav');
    nav.insertBefore(menuToggle, nav.firstChild);

    const menu = document.querySelector('.menu');
    const loginBtn = document.querySelector('.login-btn');

    const handleMenuToggle = () => {
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
      loginBtn.style.display = loginBtn.style.display === 'block' ? 'none' : 'block';
    };

    menuToggle.addEventListener('click', handleMenuToggle);

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        menu.style.display = 'none';
        loginBtn.style.display = 'none';
      } else {
        menuToggle.style.display = 'none';
        menu.style.display = 'flex';
        loginBtn.style.display = 'block';
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAuthWindow = () => {
    setAuthWindowActive(!isAuthWindowActive);
  };

  const switchForm = (formType) => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (formType === 'register') {
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    } else {
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    }

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  };

  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Логин должен содержать минимум 3 символа";
    }
    if (username.length > 15) {
      return "Логин не должен превышать 15 символов";
    }
    if (!/^[a-z0-9_-]+$/.test(username)) {
      return "Логин может содержать только строчные буквы, цифры, знаки подчеркивания и дефисы";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Пароль должен содержать минимум 8 символов";
    }
    if (!/[A-Z]/.test(password)) {
      return "Пароль должен содержать хотя бы одну заглавную букву";
    }
    if (!/[a-z]/.test(password)) {
      return "Пароль должен содержать хотя бы одну строчную букву";
    }
    if (!/\d/.test(password) && !/\W/.test(password)) {
      return "Пароль должен содержать хотя бы одну цифру или специальный символ";
    }
    return "";
  };

  const validateContact = (contact) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (emailRegex.test(contact)) {
      return "";
    } else if (phoneRegex.test(contact)) {
      return "";
    } else {
      return "Введите корректный email или номер телефона";
    }
  };

  const submitAuth = () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    let isValid = true;

    const usernameError = validateUsername(username);
    if (usernameError) {
      document.getElementById('loginUsernameError').textContent = usernameError;
      isValid = false;
    } else {
      document.getElementById('loginUsernameError').textContent = '';
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      document.getElementById('loginPasswordError').textContent = passwordError;
      isValid = false;
    } else {
      document.getElementById('loginPasswordError').textContent = '';
    }

    if (isValid) {
      alert('Форма входа отправлена!');
      toggleAuthWindow();
    }
  };

  const submitRegistration = () => {
    const contact = document.getElementById('registerContact').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    let isValid = true;

    const contactError = validateContact(contact);
    if (contactError) {
      document.getElementById('registerContactError').textContent = contactError;
      isValid = false;
    } else {
      document.getElementById('registerContactError').textContent = '';
    }

    const usernameError = validateUsername(username);
    if (usernameError) {
      document.getElementById('registerUsernameError').textContent = usernameError;
      isValid = false;
    } else {
      document.getElementById('registerUsernameError').textContent = '';
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      document.getElementById('registerPasswordError').textContent = passwordError;
      isValid = false;
    } else {
      document.getElementById('registerPasswordError').textContent = '';
    }

    if (isValid) {
      alert('Форма регистрации отправлена!');
      toggleAuthWindow();
    }
  };

  return (
    <div>
      {/* Header */}
      <header id="header">
        <nav>
          <div className="logo">
            <img src={logo} alt="PetHome Logo" /> <span>PetHome</span>
          </div>
          <div className="menu">
            <a href="#prices">Цены</a>
            <a href="/about">Про нас</a>
            <a href="#services">Сервисы</a>
            <a href="#blog">Блог</a>
            <a href="#contacts">Контакты</a>
          </div>
          <a href="#login" className="login-btn" id="loginBtn" onClick={toggleAuthWindow}>ВХОД</a>
        </nav>
      </header>
      {/* RegisterBlock */}
      {isAuthWindowActive && (
        <div className="auth-window active" id="authWindow">
          <div className="close-btn" id="closeBtn" onClick={toggleAuthWindow}>×</div>
          <div className="auth-form">
            <div id="loginForm" className="active">
              <h2>Войти</h2>
              <input type="text" id="loginUsername" placeholder="Логин" required />
              <div id="loginUsernameError" className="error-message"></div>
              <input type="password" id="loginPassword" placeholder="Пароль" required />
              <div id="loginPasswordError" className="error-message"></div>
              <a id="forgotPassword" onClick={() => alert('Функция восстановления пароля')}>Забыли пароль?</a>
              <button id="loginSubmit" onClick={submitAuth}>Войти</button>
              <a id="switchToRegister" onClick={() => switchForm('register')}>Нет аккаунта? Зарегистрируйтесь!</a>
            </div>
            <div id="registerForm">
              <h2>Регистрация</h2>
              <input type="text" id="registerContact" placeholder="Телефон или почта" required />
              <div id="registerContactError" className="error-message"></div>
              <input type="text" id="registerUsername" placeholder="Логин" required />
              <div id="registerUsernameError" className="error-message"></div>
              <input type="password" id="registerPassword" placeholder="Пароль" required />
              <div id="registerPasswordError" className="error-message"></div>
              <button id="registerSubmit" onClick={submitRegistration}>Зарегистрироваться</button>
              <a id="switchToLogin" onClick={() => switchForm('login')}>Уже есть аккаунт? Войдите!</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
