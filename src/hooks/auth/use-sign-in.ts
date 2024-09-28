import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "../../utils/api";
type SignInType = {
  email: string;
  password: string;
};
export interface IData {
  status_code: number;
  status: number;
  message: string;
  data: Root;
}
export interface Root {
    success: boolean
    accessToken: string
    data: Data
  }
  
  export interface Data {
    user: User
    settingsDefault: SettingsDefault
  }
  
  export interface User {
    notifyPlatform: NotifyPlatform
    setting: Setting
    lineManager: any
    leave_approver: any
    internship_type: any
    availableLeaves: number
    availableWfhDays: number
    is_support_working_leave: boolean
    totalWfhDays: number
    totalDayLeave: number
    role: number
    switchRole: boolean
    status: string
    confirmed: boolean
    partnerMembers: any[]
    is_cv: boolean
    is_syll: boolean
    is_registration_book: boolean
    is_identify_id: boolean
    is_job_application: boolean
    is_degree: boolean
    is_health_certification: boolean
    is_portrait: boolean
    deleted: boolean
    children: any[]
    _id: string
    id: string
    username: string
    firstname: string
    lastname: string
    jobTitle: string
    title: number
    mobile: string
    birthDay: string
    identify_id: string
    identify_issued_date: string
    identify_issued_by: string
    address: string
    temporary_address: string
    bank_info: BankInfo[]
    contract_no: string
    joinedDate: string
    contract_sign_times: number
    partner: string
    createdAt: string
    updatedAt: string
    path: string
    __v: number
    picture: string
    password: string
  }
  
  export interface NotifyPlatform {
    slack: string
    telegram: string
    zalo: string
  }
  
  export interface Setting {
    member: Member
    language: string
  }
  
  export interface Member {
    sandbox: Sandbox
  }
  
  export interface Sandbox {
    noSandboxDisplay: string
  }
  
  export interface BankInfo {
    _id: string
  }
  
  export interface SettingsDefault {}
  

const useSignIn = () => {
  const {
    data,
    mutateAsync: submit,
    error,
    isPending: submitting,
    isError,
  } = useMutation({
    mutationFn: async (variables: SignInType) => {
      return (await api({
        url: REQUEST_URL.SIGN_IN,
        method: "POST",
        data: variables,
      })) as IData;
    },
    onSuccess: (data) => {
      if (data?.status_code === 200) {
        console.log(data);
      }
    },
    onError: (error) => {
      if (error.message.includes("Địa chỉ email hoặc mật khẩu không đúng")) {
        console.log(error?.message);
      }
      return;
    },
    networkMode: "always",
  });
  return {
    data: data?.data,
    submit,
    error,
    isError,
    submitting,
  };
};
export default useSignIn;
