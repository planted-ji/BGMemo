# 📝 BGMemo
https://planted-ji.github.io/BGMemo/  

## ⏰ 개발 기간
- 23.04.23 ~ 23.04.27
  
## 🖥️ 프로젝트 소개
- 두 가지 테마(낮/밤 모드)가 있는 메모장입니다.  
- 테마에 어울리는 BGM을 들으며 메모를 작성할 수 있습니다.

## 📌 주요 기능
메모 관리
- '메모 추가' 버튼을 클릭하면 innerHTML을 통해 새로운 메모 생성.
- 사용자가 메모 데이터를 작성하면 JSON 문자열로 변환하여 로컬 스토리지에 저장.
- 저장된 메모 목록(allMemo)을 순회하며 작성한 전체 메모를 화면에 표시.
- 메모 수정, 삭제, 제목 또는 내용 입력 시 로컬 스토리지에 변경 데이터 업데이트.

배경 음악 플레이어
- 재생, 일시정지, 정지 기능 제공.
- 음악 재생 시 진행 상황을 나타내는 프로그레스 바 표시.
- 테마(낮/밤 모드)에 따른 음악 전환 기능 제공.

테마 전환
- '테마 전환' 버튼을 클릭하면 dark class 여부를 확인해 낮/밤 모드 전환.
- 전역 변수를 통해 테마 전환에 따른 전체 색상 값 조정.

## ⚙️ 리팩토링
- 사용자 편의를 고려해 키보드 접근성, 버튼 설명, 자동 생성 제목, 중복 스크롤 바에 대한 리팩토링 진행.
- [메모장 프로젝트 리팩토링 기록 (VELOG)](https://velog.io/@simej1214/BGMemo-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)
