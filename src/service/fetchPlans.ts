export const fetchPlans = async () => {
  try {
    const response = await fetch(
      "https://rimac-front-end-challenge.netlify.app/api/plans.json"
    );

    if (!response) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching plans:", error);
  }
};
