import { FormEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AuthActions } from "../../store/authSlice/authSlice";

import Redirect from "../Components/Redirect";

const AuthPage = () => {
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);

    function FormSubmitHandler(e: FormEvent) {
        e.preventDefault();
        dispatch(AuthActions.login());
    }

    if (isAuth) return <Redirect />;

    return (
        <form onSubmit={FormSubmitHandler}>
            <input type="text" />
            <input type="text" />
            <button type="submit">Login</button>
        </form>
    );
};

export default AuthPage;
