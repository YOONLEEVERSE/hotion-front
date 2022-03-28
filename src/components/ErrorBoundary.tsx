import React, { ReactPropTypes, useState } from "react";

// function ErrorBoundary(){
//     const [hasError,setError] = useState(false)
//     return(
//         <div>에러임</div>
//     )
//}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  //   state: State = {
  //     hasError: false,
  //   };

  static getDerivedStateFromError(error: any) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
