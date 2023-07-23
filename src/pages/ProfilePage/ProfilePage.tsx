import Private from "../Wrappers/Private";

const ProfilePage = () => {
    return (
        <>
            <h1>ProfilePage component</h1>
        </>
    );
};

const PrivateProfilePage = () => (
    <Private>
        <ProfilePage />
    </Private>
);
export default PrivateProfilePage;
