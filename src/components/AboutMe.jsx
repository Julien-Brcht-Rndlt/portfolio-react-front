export default function AboutMe({ firstname, lastname, role, about}) {
    return (
        <div>
            <div>{firstname}</div>
            <div>{role}</div>
            <div>{about}</div>
        </div>
    );
}