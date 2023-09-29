export const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
};

export const handleExpire = () => {
    console.log("happening")
    if (window.confirm("Session Expired! Please login again!")) {
        handleLogout();
    }
}