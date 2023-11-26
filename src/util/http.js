import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

export const queryClient = new QueryClient();

export async function getAllUsers() {
  const response = await fetch(
    "https://food-order-97467-default-rtdb.firebaseio.com/user.json"
  );
  if (!response.ok) {
    const error = new Error("An error occurred");
    error.info = "Something Went wrong. Please try again later";
    throw error;
  }
  const users = await response.json();
  return users;
}

export async function createUser(user) {
  const response = await fetch(
    "https://food-order-97467-default-rtdb.firebaseio.com/user.json",
    {
      method: "POST",
      body: JSON.stringify(user),
    }
  );
  if (!response.ok) {
    const error = new Error("An error occurred");
    error.info = "Unable to Sign up. Please try again later";
    throw error;
  }
  const users = await response.json();
  console.log(users.name);
  localStorage.setItem("id", users.name);
  return users;
}

export function isUserLoggedIn() {
  const id = localStorage.getItem("id");
  if (!id) {
    return undefined;
  }
  return id;
}

export function checkUserLoggedIn() {
  const id = localStorage.getItem("id");
  if (!id) {
    return redirect("/login?mode=login");
  }
  return null;
}

export function logoutAction() {
  localStorage.removeItem("id");
  localStorage.removeItem("cart");
  return redirect("/");
}

export async function getAllMeals() {
  const response = await fetch(
    "https://food-order-97467-default-rtdb.firebaseio.com/Meals.json"
  );
  if (!response.ok) {
    const error = new Error("An error occurred");
    error.info = "Unable to load the menu. Please try again later";
    throw error;
  }
  const meals = await response.json();
  return meals;
}

export async function updatecart(cart) {
  const id = localStorage.getItem("id");
  const response = await fetch(
    `https://food-order-97467-default-rtdb.firebaseio.com/user/${id}/cart.json`,
    {
      method: "PUT",
      body: JSON.stringify(cart),
    }
  );
  if (!response.ok) {
    const error = new Error("An error occurred");
    error.info = "Unable save the cart. Please try again Later";
    throw error;
  }
  const meals = await response.json();
  return meals;
}

export async function getCartData() {
  const id = localStorage.getItem("id");
  const response = await fetch(
    `https://food-order-97467-default-rtdb.firebaseio.com/user/${id}/cart.json`
  );
  if (!response.ok) {
    const error = new Error("An error occurred");
    error.info = "Unable to load the Cart. Please try again later";
    throw error;
  }
  const meals = await response.json();
  return meals;
}

export async function deleteCartData() {
  const id = localStorage.getItem("id");
  const response = await fetch(
    `https://food-order-97467-default-rtdb.firebaseio.com/user/${id}/cart.json`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    const error = new Error("An error occurred");
    error.info = "Unable to Clear the Cart. Please try again later";
    throw error;
  }
  const meals = await response.json();
  return meals;
}
