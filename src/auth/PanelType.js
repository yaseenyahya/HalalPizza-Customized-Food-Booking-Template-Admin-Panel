const PanelType = {
  Admin: 2,
  User: 1
};
export function getPanelTypeString(panelTypeInt) {
  for (const type in PanelType) {
    if (PanelType[type] === panelTypeInt) {
      return type;
    }
  }
  return null; // Handle the case where the input is not a valid PanelType
}
export default PanelType;
