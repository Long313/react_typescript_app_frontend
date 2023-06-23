import api from "../utils/api";
export const register = (params: any) => {
  return api({
    method: "POST",
    url: "/users",
    data: {
      ...params,
    },
  });
};
export const login = (params: any) => {
  return api({
    method: "POST",
    url: "/login",
    data: {
      ...params,
    },
  });
};
export const getAllUsers = (token: any) => {
  return api({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: "/users",
  });
};

export const updateUser = (token: any, params: any) => {
  return api({
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: "user",
    data: {
      ...params,
    },
  });
};

export const deleteUser = (token: any, param: any) => {
  return api({
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `/users/${param}`,
  });
};

export const getUserInfor = (param: any) => {
  return api({
    method: "GET",
    url: `/profiles/${param}`,
  });
};

export const getAllArticles = (token: any, param: any) => {
  return api({
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `/${param}`,
  });
};

export const createArticle = (token: any, params: any) => {
  return api({
    method: "POST",
    url: "/articles",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...params,
    },
  });
};

export const getListArticles = (token: any) => {
  return api({
    method: "GET",
    url: "/articles",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailArticle = (token: any, param: any) => {
  return api({
    method: "GET",
    url: `/articles/${param}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteArticle = (token: any, param: any) => {
  return api({
    method: "DELETE",
    url: `/articles/${param}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateArticle = (token: any, slug: string, params: any) => {
  return api({
    method: "DELETE",
    url: `/articles/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...params,
    },
  });
};

export const getComments = (token: any, slug: any) => {
  return api({
    method: "GET",
    url: `/articles/${slug}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createComment = (token: any, slug: any, param: any) => {
  return api({
    method: "POST",
    url: `/articles/${slug}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ...param,
    },
  });
};

export const deleleComment = (
  token: any,
  slug: string,
  id: string | number
) => {
  return api({
    method: "DELETE",
    url: `/articles/${slug}/comments/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
