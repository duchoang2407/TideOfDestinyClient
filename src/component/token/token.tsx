const token = localStorage.getItem("token");

const res = await fetch("http://localhost:5168/api/User/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
