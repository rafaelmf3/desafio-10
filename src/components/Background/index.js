import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

export default styled(LinearGradient).attrs({
  colors: ["rgba(34,32,44,1)", "rgba(64,40,69,1)"]
})`
  flex: 1;
`;
