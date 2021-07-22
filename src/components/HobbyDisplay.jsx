export default function HobbyDisplay({ id, label, icon }) {
    return (
    <div>
        <div><img src={icon} alt={`icon-${label}`} /></div>
        <div><h5>{label}</h5></div>
    </div>
    );
}