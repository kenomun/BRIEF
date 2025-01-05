// Función para obtener el rol desde localStorage
export const getRoleFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};
