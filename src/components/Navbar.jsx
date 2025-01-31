import React, { useState } from "react";
import logo from "../assets/logo_upateco.png";
import { register, login } from "../api/api";

const Navbar = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    password: "",
    estado: "activo",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleRegister = async () => {
    try {
      await register(registerData);
      alert("Registro exitoso");
      setShowRegisterModal(false);
    } catch (error) {
      alert("Error al registrarse");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login(loginData);
      const { token, id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      alert("Inicio de sesión exitoso");
      setShowLoginModal(false);
      window.location.href = "/Gestor";
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    window.location.href = "/"; 
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Icono"
            className="w-32 h-auto mr-4" // Se ajusta el tamaño del logo
          />
        </div>

        {/* Botones */}
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
            onClick={() => setShowRegisterModal(true)}
          >
            Registrarse
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
            onClick={() => setShowLoginModal(true)}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>

      {/* Modal de registro */}
      {showRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Registro</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={registerData.nombre}
              onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Registrarse
            </button>
            <button
              onClick={() => setShowRegisterModal(false)}
              className="w-full mt-2 bg-gray-400 text-white py-2 rounded-full hover:bg-gray-500 transition-colors duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de inicio de sesión */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={handleLogout}
              className="w-full mt-2 bg-gray-400 text-white py-2 rounded-full hover:bg-gray-500 transition-colors duration-300"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full mt-2 bg-gray-400 text-white py-2 rounded-full hover:bg-gray-500 transition-colors duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;



