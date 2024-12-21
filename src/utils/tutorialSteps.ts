export function getTutorialSteps(type: string): string[] {
    switch (type) {
        case 'backend':
            return [
                '백엔드 개발 입문',
                '1. Node.js 설치하기',
                '- Node.js 공식 웹사이트 방문',
                '- 운영체제에 맞는 버전 다운로드',
                '- 설치 및 환경변수 설정',
                '2. Express 프레임워크 시작하기',
                '- npm init으로 프로젝트 생성',
                '- Express 설치 및 기본 서버 생성',
                '- 라우팅 설정하기',
                '3. MongoDB 데이터베이스 연동',
                '- MongoDB 설치 및 설정',
                '- Mongoose ODM 사용하기',
                '- 기본 CRUD 작성'
            ];
        case 'frontend':
            return [
                '프론트엔드 개발 입문',
                '1. HTML/CSS 기초',
                '- HTML 문서 구조 이해하기',
                '- CSS 선택자와 스타일링',
                '- 반응형 웹 디자인',
                '2. JavaScript 핵심 개념',
                '- 변수와 데이터 타입',
                '- 함수와 이벤트 처리',
                '- DOM 조작하기',
                '3. React 시작하기',
                '- Create React App',
                '- 컴포넌트 생성과 props',
                '- 상태 관리와 훅스'
            ];
        case 'fullstack':
            return [
                '풀스택 개발 시작하기',
                '1. 개발 환경 준비',
                '- VS Code 설정',
                '- Git 설치 및 설정',
                '- Docker 기본 사용법',
                '2. 백엔드 API 개발',
                '- RESTful API 설계',
                '- 미들웨어 설정',
                '- 데이터베이스 연동',
                '3. 프론트엔드 개발',
                '- React와 Redux 사용',
                '- 컴포넌트와 상태 관리',
                '- API 호출과 데이터 처리'
            ];
        default:
            return [];
    }
}
