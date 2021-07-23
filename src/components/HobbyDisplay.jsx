import styled from 'styled-components';

export default function HobbyDisplay({ id, label, icon }) {
  const SkillDisplayCard = styled.div`
    padding: 35px;
    border: 1px solid #3993c7;
    border-radius: 4px;
  `;

const SkillDisplayHeader = styled.div``;

const SkillDisplayLabel = styled.h4``;

const SkillDiplayContent = styled.div``;

const SkillDisplayInfo = styled.h5``;

const SkillDisplayImage = styled.img``;

    return (
    <div>
        <div><img src={icon} alt={`icon-${label}`} style={{ width: "150px", height: "150px" }}/></div>
        <div><h5>{label}</h5></div>
    </div>
    );
}