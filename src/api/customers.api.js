import { baseApi } from "./baseApi"

export const CustomerApi = {
    async getAll() {
        const response = await baseApi.get("/customers");
        return response.data
    },
    async deleteCustomer(id){
        const response = await baseApi.delete(`/customers/${id}`)
        return response.data;
    },
    async updateStatus({id,data}){
       const response = await baseApi.put(`/customers/${id}`,data);
       return response.data;
    }
}