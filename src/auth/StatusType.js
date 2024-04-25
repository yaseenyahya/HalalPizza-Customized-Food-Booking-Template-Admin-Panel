const StatusType = {
  Active:1,
  Blocked:2,
  Inactive:3
};
export function getStatusTypeString(statusTypeInt) {
  for (const type in StatusType) {
    if (StatusType[type] === statusTypeInt) {
      return type;
    }
  }
  return null; // Handle the case where the input is not a valid PanelType
}
export default StatusType;
