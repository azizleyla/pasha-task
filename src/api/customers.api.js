import { baseApi } from "./baseApi"

export const CustomerApi = {
    async getAll() {
        const response = await baseApi.get("/customers");
        return response.data
    },
    async getFilterer({ statusQuery, searchQuery }) {
        const response = await baseApi.get(`/customers?status=${statusQuery}&&fullName_like=${searchQuery}`)
        return response.data
    },
    async deleteCustomer(id) {
        const response = await baseApi.delete(`/customers/${id}`)
        return response.data;
    },
    async updateStatus({ id, data }) {
        const response = await baseApi.put(`/customers/${id}`, data);
        return response.data;
    },
    async updateCustomer({ id, data }) {

        const response = await baseApi.put(`/customers/${id}`, data);
        return response.data;
    },
    async createCustomer(data) {
        const response = await baseApi.post('/customers', data);
        return response.data;
    }

}