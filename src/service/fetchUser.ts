export const fetchUser = async () => {
  try {
    const response = await fetch(
      "https://rimac-front-end-challenge.netlify.app/api/user.json"
    );

    if (!response) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error", error);
  }
};
