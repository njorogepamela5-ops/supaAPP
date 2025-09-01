import axios from "axios";

// This is just a template for STK Push
export async function initiateSTKPush(phone: string, amount: number) {
  try {
    const response = await axios.post("YOUR_STK_PUSH_API_URL", {
      phone,
      amount,
    });
    console.log("STK Push response:", response.data);
    return response.data;
  } catch (error) {
    console.error("STK Push error:", error);
    throw error;
  }
}
