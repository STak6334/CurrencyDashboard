# Streamlit Cloud 배포 가이드

## 🚀 Streamlit으로 배포하기

Streamlit Cloud를 사용하면 Python 대시보드를 무료로 호스팅할 수 있습니다.

---

## 📋 사전 요구사항

✅ GitHub 계정  
✅ Streamlit 계정 (GitHub로 로그인 가능)  
✅ 로컬에서 `streamlit_app.py`와 `requirements.txt` 준비  

---

## 🔧 로컬에서 테스트

### 1. Streamlit 설치

```bash
pip install streamlit requests pandas plotly python-dotenv openai
```

### 2. 로컬 실행

```bash
# 백엔드 실행 (다른 터미널)
cd CurrencyDashboard
npm run dev

# Streamlit 실행
streamlit run streamlit_app.py
```

브라우저에서 `http://localhost:8501` 접속 확인

---

## ☁️ Streamlit Cloud 배포

### 단계 1: Streamlit 계정 생성

1. https://streamlit.io 접속
2. **"Sign up"** 클릭
3. **GitHub로 로그인** 선택
4. 권한 허가

### 단계 2: 새 앱 배포

1. Streamlit 대시보드 접속: https://share.streamlit.io
2. **"New app"** 클릭
3. 다음 정보 입력:
   - **Repository**: `STak6334/CurrencyDashboard`
   - **Branch**: `main`
   - **Main file path**: `CurrencyDashboard/streamlit_app.py`
4. **Deploy!** 클릭

**배포 URL**: `https://currencydashboard-[random].streamlit.app`

---

## 🔌 백엔드 API 연결

### 방법 1: 로컬 백엔드 (개발용)

```python
# streamlit_app.py에서
api_url = "http://localhost:8787"
```

### 방법 2: 클라우드 백엔드 (프로덕션)

Streamlit에서 백엔드 API URL을 입력하여 설정:

```
🔧 Configuration → API Backend URL 입력
예: https://your-backend.onrender.com
```

---

## 📊 Streamlit에 포함된 기능

✅ **기축통화 교육 탭**
- Federal Reserve 금리 시뮬레이터
- 경제 지표 차트 (GDP, 인플레이션, 실업률)
- 주요국 외환보유고 시각화

✅ **투자 시뮬레이터 탭**
- OpenAI 시장 분석 (API 연결 필요)
- 포트폴리오 구성 시각화
- 실시간 통계

✅ **시스템 상태 탭**
- 헬스 체크 (Backend 상태 확인)
- 서버 통계 조회
- API 엔드포인트 문서

---

## 🔐 환경 변수 설정 (선택사항)

Streamlit Cloud에서 시크릿 관리:

1. 배포된 앱 → **Settings** → **Secrets**
2. 다음 추가:

```
OPENAI_API_KEY = "sk-your-key"
BACKEND_URL = "https://your-backend.onrender.com"
```

Python에서 접근:

```python
import streamlit as st
api_key = st.secrets["OPENAI_API_KEY"]
backend = st.secrets["BACKEND_URL"]
```

---

## ⚡ 성능 최적화

### 1. 캐싱 활용

```python
@st.cache_data(ttl=300)  # 5분 캐시
def fetch_health_status():
    response = requests.get(f"{api_url}/api/health")
    return response.json()
```

### 2. 세션 상태 관리

```python
if "api_data" not in st.session_state:
    st.session_state.api_data = None
```

### 3. 타임아웃 설정

```python
response = requests.get(url, timeout=10)  # 10초 제한
```

---

## 📝 배포 체크리스트

- [ ] 로컬에서 Streamlit 실행 테스트 완료
- [ ] `streamlit_app.py` GitHub에 커밋
- [ ] `requirements.txt` 확인
- [ ] Streamlit 계정 생성
- [ ] GitHub 저장소 연결
- [ ] 앱 배포 완료
- [ ] 배포된 앱 테스트
- [ ] 백엔드 API URL 설정
- [ ] 세크릿(API Key) 설정 (필요시)

---

## 🐛 문제 해결

### "ModuleNotFoundError: No module named 'streamlit'"

```bash
# requirements.txt 확인 및 설치
pip install -r requirements.txt
```

### "Cannot connect to API"

1. API URL 확인
2. 백엔드 서버 실행 여부 확인
3. CORS 설정 확인 (server.mjs)

### "Connection timeout"

- 로컬 개발: `npm run dev` 터미널 확인
- 클라우드: 백엔드 호스팅 서비스 상태 확인

### 앱이 사라짐 (Inactive)

- Streamlit Cloud는 30일 동안 사용하지 않으면 자동 삭제
- 재배포: New app → 설정 반복

---

## 🔗 배포된 앱 URL

| 서비스 | URL | 상태 |
|-------|-----|------|
| GitHub Pages (정적) | https://STak6334.github.io/CurrencyDashboard | ✅ 배포됨 |
| Streamlit Cloud | https://currencydashboard-[random].streamlit.app | ⏳ 배포 중 |
| 로컬 개발 | http://localhost:5173 (React) | 로컬 |
| 로컬 개발 | http://localhost:8501 (Streamlit) | 로컬 |

---

## 📚 참고 링크

- Streamlit Docs: https://docs.streamlit.io
- Streamlit Cloud: https://share.streamlit.io
- Streamlit 컴포넌트: https://streamlit.io/docs/api
- 배포 예제: https://github.com/streamlit/streamlit-example

---

## 💡 다음 단계

1. **Streamlit 배포 완료** ✅
2. **백엔드 API 배포** (Render.com, Railway 등)
3. **데이터베이스 연결** (선택사항)
4. **캐싱 시스템 개선**
5. **CI/CD 파이프라인** 구성

---

**상태**: Streamlit 앱 준비 완료 및 GitHub에 푸시됨  
**다음**: Streamlit Cloud에서 배포 시작!
