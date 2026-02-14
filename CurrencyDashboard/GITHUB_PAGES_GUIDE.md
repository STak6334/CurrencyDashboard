# GitHub Pages 배포 가이드

## 🚀 현재 상태

✅ **프론트엔드**: GitHub Pages에 배포 완료  
📍 **URL**: https://STak6334.github.io/CurrencyDashboard  
⏳ **백엔드**: 별도 호스팅 필요

---

## 📋 GitHub Pages 설정

### 1. GitHub Repository Settings 확인
1. GitHub 저장소 열기: https://github.com/STak6334/CurrencyDashboard
2. **Settings** → **Pages** 이동
3. 다음 설정 확인:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `/(root)`
   - **Status**: "Your site is live at https://STak6334.github.io/CurrencyDashboard"

### 2. 자동 배포 활성화 (선택사항)
GitHub Actions로 자동 배포 설정:

`.github/workflows/deploy.yml` 생성:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🔌 백엔드 API 호스팅

프론트엔드가 API를 호출하려면 백엔드가 필요합니다.

### 옵션 1: Render.com (권장 - 무료)

```bash
# 1. https://render.com 접속 → 가입
# 2. New+ → Web Service
# 3. GitHub 저장소 연결
# 4. 배포 설정:
#    - Build Command: npm install
#    - Start Command: node server.mjs
#    - Environment: Add OPENAI_API_KEY
# 5. Create Web Service
```

배포 후:
```bash
# Render 백엔드 URL (예): https://currencydashboard.onrender.com
# .env에 추가:
VITE_API_URL=https://currencydashboard.onrender.com
```

### 옵션 2: Railway.app (무료 토큰 포함)

```bash
# 1. https://railway.app 접속 → GitHub 로그인
# 2. New Project → Deploy from GitHub repo
# 3. 저장소 선택
# 4. Environment 설정 (OPENAI_API_KEY 추가)
# 5. 자동 배포 완료
```

### 옵션 3: Vercel (무료, Node.js 지원)

```bash
# 1. https://vercel.com 접속 → GitHub 연결
# 2. Import Project → 저장소 선택
# 3. Environment Variables 설정:
#    - OPENAI_API_KEY
#    - OPENAI_MODEL=gpt-3.5-turbo
# 4. Deploy
```

### 옵션 4: Heroku (유료 대체)
> ⚠️ Heroku 무료 플랜 종료됨 - 대체 서비스 사용

---

## 🔧 배포 후 설정

### 1. 프론트엔드 API URL 업데이트

**방법 A**: 환경 변수 사용 (권장)
```bash
# GitHub Pages 배포 전
VITE_API_URL=https://your-backend-url.com

npm run build
npm run deploy
```

**방법 B**: 소스 코드 수정
```javascript
// src/App.jsx
const apiUrl = 'https://your-backend-url.com'
```

### 2. CORS 설정 (백엔드)

`server.mjs`의 OPTIONS 응답에서:
```javascript
headers: {
    'Access-Control-Allow-Origin': 'https://STak6334.github.io',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
}
```

### 3. 환경 변수 설정 (백엔드 호스팅 서비스)

모든 호스팅 서비스에 추가:
```
OPENAI_API_KEY=sk-your-actual-key
OPENAI_MODEL=gpt-3.5-turbo
PORT=8787
NODE_ENV=production
```

---

## 📊 배포 확인

### 프론트엔드 확인
```bash
# 1. 브라우저에서 접속
https://STak6334.github.io/CurrencyDashboard

# 2. 콘솔 확인 (F12 → Console)
# - CORS 에러 없음
# - API 응답 정상
```

### 백엔드 확인
```bash
# 1. 헬스 체크
curl https://your-backend-url.com/api/health

# 2. 응답 JSON 확인
{
  "status": "healthy",
  "components": {
    "openai_api": "operational",
    "memory": "normal",
    "cache": "healthy"
  }
}
```

---

## 🚀 빠른 배포 명령어

### 로컬 테스트 (백엔드 로컬)
```bash
cd CurrencyDashboard
npm run dev
# http://localhost:5173 접속
```

### 프론트엔드만 빌드 & 배포
```bash
npm run build
npm run deploy
```

### 전체 프로젝트 다시 배포
```bash
# git push하면 GitHub Actions 자동 배포 (설정한 경우)
git add .
git commit -m "Update"
git push origin main
```

---

## 📝 배포 URL 정리

| 항목 | 로컬 | GitHub Pages | 프로덕션 |
|------|------|--------------|---------|
| **프론트엔드** | http://localhost:5173 | https://STak6334.github.io/CurrencyDashboard | ✅ 배포 완료 |
| **백엔드** | http://localhost:8787 | ⏳ 별도 설정 필요 | https://your-backend-url.com |
| **API** | http://localhost:8787/api/health | https://your-backend-url.com/api/health | - |

---

## ✅ 체크리스트

- [ ] GitHub Pages 정상 작동 확인
- [ ] 백엔드 호스팅 서비스 선택
- [ ] 백엔드 환경 변수 설정 (OPENAI_API_KEY)
- [ ] 백엔드 배포 완료
- [ ] CORS 설정 확인
- [ ] `VITE_API_URL` 환경 변수 업데이트
- [ ] 전체 테스트 (프론트엔드 + 백엔드)
- [ ] GitHub Pages 배포 완료

---

## 🐛 문제 해결

### "No such file or directory: dist"
```bash
npm run build  # dist 폴더 생성
npm run deploy  # 재배포
```

### "API is unreachable"
- 백엔드 호스팅 서비스 상태 확인
- VITE_API_URL 환경 변수 확인
- CORS 헤더 확인

### "GitHub Pages not showing"
- Repository Settings → Pages → Source 확인
- gh-pages 브랜치 확인
- 캐시 삭제 (Ctrl+Shift+Delete)

---

## 📚 참고 링크

- GitHub Pages: https://pages.github.com/
- Render.com: https://render.com
- Railway.app: https://railway.app
- Vercel: https://vercel.com
- OpenAI API Docs: https://platform.openai.com/docs

---

**다음 단계**: 위 옵션 중 하나를 선택하여 백엔드 API를 배포하세요!
