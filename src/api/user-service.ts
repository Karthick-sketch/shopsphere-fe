import apiClient from "./interceptor/api-client";
import type { ShippingDetails } from "../models/user";

const serviceRoute = "/shopsphere-user-service/api/users";

export default class UserService {
  static async fetchShippingDetails(authUserId: number) {
    const res = await apiClient.get<ShippingDetails>(
      `${serviceRoute}/shipping-details/${authUserId}`,
    );
    return res.data;
  }
}
