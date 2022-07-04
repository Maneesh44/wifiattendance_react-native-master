
const BASE_URL='https://wifiattendancenoenitity.azurewebsites.net/'
const PATH = 'api/';
const PATH1='me/'

const ApiConfig={
    LOGIN: BASE_URL + PATH +'Account/'+'LogIn',
    Weekly_Punch:BASE_URL + PATH +'PunchDetails/GetWeeklyPunchDetailsandleave',
    PROFILE:BASE_URL + PATH+'Employee/'+'Profile',
    DEDUCTION:BASE_URL+PATH1+'Salary/'+'Deduction',
    MONTHWISE:BASE_URL+PATH1+'Attendance/'+'Monthwise',
    PUNCH_IN_OUT:BASE_URL+PATH1+'Attendance/CheckInOut' ,
    Leave_Apply:BASE_URL+PATH1+'Leave/Apply',
    Leave_History:BASE_URL+PATH1+'Leave/Summary',
    Update_Employee:BASE_URL+PATH1+'Employee/Update',
    NOTIFICATION:BASE_URL+PATH1+'Notification/Get',
}
export default ApiConfig;