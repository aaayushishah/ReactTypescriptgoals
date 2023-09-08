export const hydrateUsers = (data: any) => data.map((d: any) => hydrateUser(d));

export const hydrateUser = (data: any) => {
  return {
    name: data.name,
    email: data.email,
    id: data._id,
  };
};
