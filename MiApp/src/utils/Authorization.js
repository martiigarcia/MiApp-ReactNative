import { environment } from "../environments/environments";

const Authorization = {
    headers: {
        "Authorization": environment.token,
    },
};

export default Authorization;
