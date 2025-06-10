import ky, { KyInstance } from "ky";
import { injectAccessHandler } from "@/features/_core/handler";
const baseURL = "http://localhost:1987/v1/";

const baseApi = ky.create();

const authApi = ky.create({
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => injectAccessHandler(request),
    ],
  },
});

const server = (api: KyInstance) => (route: string) => {
  return api.extend({
    prefixUrl: `${baseURL}${route}/`,
  });
};

const baseServer = server(baseApi);
const authServer = server(authApi);

const AuthServer = baseServer("auth");
const AdminServer = authServer("admins");
const StudentServer = authServer("students");
const AcademicFieldServer = authServer("academic-field");
const SwMileageServer = authServer("sw-mileages");
const SwMileageTokenServer = authServer("sw-mileage-tokens");
const SwMileageTokenHistoryServer = authServer("sw-mileage-token-histories");
const WalletServer = authServer("wallet");

export {
  AuthServer,
  AdminServer,
  StudentServer,
  AcademicFieldServer,
  SwMileageServer,
  SwMileageTokenServer,
  SwMileageTokenHistoryServer,
  WalletServer
};
