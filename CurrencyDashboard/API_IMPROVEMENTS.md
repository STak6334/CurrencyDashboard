# 🚀 CurrencyDashboard - API 개선 완료

## 최신 업그레이드 (2026-02-14)

### ✅ 구현된 개선사항

#### 1️⃣ `/api/health` 엔드포인트 - 상세 헬스체크
**엔드포인트**: `GET /api/health`

**응답 예시**:
```json
{
  "status": "degraded|healthy|unhealthy",
  "uptime": "2h 34m 12s",
  "timestamp": "2026-02-14T15:28:00Z",
  "checks": {
    "openai": {
      "status": "degraded",
      "error": "No valid API key configured (using demo key)"
    },
    "memory": {
      "status": "healthy",
      "usage_percent": 75,
      "heap_mb": 7
    },
    "cache": {
      "status": "healthy",
      "size": 0
    }
  },
  "version": "1.2.3-local",
  "environment": "development"
}
```

**HTTP Status 코드**:
- ✅ `200` - Healthy (모든 시스템 정상)
- ⚠️ `206` - Degraded (일부 시스템 이슈)
- ❌ `503` - Unhealthy (심각한 문제)

---

#### 2️⃣ 추가 헬스 엔드포인트

**`GET /api/health/live`** - Liveness Probe (Kubernetes 용)
```bash
curl http://localhost:8787/api/health/live
```
응답: `{"status":"alive","timestamp":"2026-02-14T20:36:32.901Z"}`

**`GET /api/health/ready`** - Readiness Probe (모든 의존성 체크)
```bash
curl http://localhost:8787/api/health/ready
```
응답: `{"status":"ready","dependencies":{...},"timestamp":"..."}`

**`GET /api/health/deep`** - 상세 헬스 + 메트릭
```bash
curl http://localhost:8787/api/health/deep
```
응답: `/api/health` + 전체 메트릭 포함

---

#### 3️⃣ `/api/stats` 개선 - 엔드포인트별 메트릭
**엔드포인트**: `GET /api/stats`

**응답 예시**:
```json
{
  "period": "all_time",
  "requests_total": 127,
  "requests_last_5min": 42,
  "errors_total": 3,
  "error_rate_percent": "2.36",
  "avg_latency_ms": 187,
  "cache_hit_rate_percent": "65.75",
  "top_endpoints": [
    {
      "endpoint": "POST /api/analysis",
      "count": 89,
      "errors": 2,
      "avg_latency_ms": 245
    },
    {
      "endpoint": "GET /api/health",
      "count": 28,
      "errors": 0,
      "avg_latency_ms": 5
    }
  ]
}
```

---

#### 4️⃣ `/api/analysis` 개선

**새로운 응답 포맷**:
```json
{
  "analysis": "분석 내용...",
  "cached": false,
  "duration_ms": 1250,
  "ai_duration_ms": 1200,
  "confidence_score": 0.85
}
```

**새로운 엔드포인트**: `GET /api/analysis/status`
```bash
curl http://localhost:8787/api/analysis/status
```
응답: 캐시된 분석 수, TTL 등

---

#### 5️⃣ 공통 응답 헤더

모든 응답에 다음 헤더 포함:
```
X-App-Version: 1.2.3-local      # 앱 버전
X-Request-ID: req_abc123456     # 요청 추적용 ID
X-Response-Time-Ms: 245         # 응답 시간 (ms)
X-Cache: HIT|MISS               # 캐시 상태
```

---

### 🧪 테스트 (curl 명령어)

```bash
# 1. 상세 헬스 체크
curl http://localhost:8787/api/health

# 2. 빠른 liveness 체크
curl http://localhost:8787/api/health/live

# 3. Readiness 체크 (배포 용)
curl http://localhost:8787/api/health/ready

# 4. 깊은 헬스체크 + 메트릭
curl http://localhost:8787/api/health/deep

# 5. 전체 요청 통계
curl http://localhost:8787/api/stats

# 6. AI 분석 요청
curl -X POST http://localhost:8787/api/analysis \
  -H "Content-Type: application/json" \
  -d '{
    "fedRate": 5.33,
    "exchangeRate": 1340,
    "stockKrw": 50000000,
    "goldKrw": 10000000,
    "bond": 20000000
  }'

# 7. 분석 캐시 상태
curl http://localhost:8787/api/analysis/status
```

---

### 📊 메트릭 수집 기능

#### 자동으로 추적되는 항목:
- ✅ 요청 수 (전체 / 최근 5분 / 엔드포인트별)
- ✅ 에러율 (4xx, 5xx)
- ✅ 평균 레이턴시 (ms)
- ✅ 상위 엔드포인트 (Top 5)
- ✅ 캐시 히트율
- ✅ 응답 시간

---

### 🎯 프론트멘 대시보드 통합 예정

**다음 단계**:
1. React에서 `useEffect` polling으로 health 상태 확인
2. 상단에 Status Badge 추가 (🟢 healthy / 🟡 degraded / 🔴 unhealthy)
3. Dev Tools 섹션에서 `/api/stats` 실시간 조회
4. 분석 버튼 클릭 시 duration + confidence_score 표시

---

### 📋 인프라 통합 준비

이제 다음 환경에서 직접 사용 가능:
- ✅ Kubernetes health probes (`/api/health/live`, `/api/health/ready`)
- ✅ Prometheus metrics export (JSON 형식)
- ✅ Grafana 대시보드 연결 준비
- ✅ 로깅 시스템 추적 (`X-Request-ID`)

---

### 🔍 개발 중 디버깅

```bash
# 실시간 서버 로그 확인
# server.mjs에서 모든 요청/응답 기록됨 (JSON 포맷)

# 캐시 히트율 확인
curl http://localhost:8787/api/stats | jq '.cache_hit_rate_percent'

# 느린 엔드포인트 찾기
curl http://localhost:8787/api/stats | jq '.top_endpoints | sort_by(.avg_latency_ms) | reverse'
```

---

### 📝 다음 개선 예정

- [ ] OpenAPI/Swagger UI (`/api/docs`)
- [ ] 시간대별 메트릭 (hourly, daily trends)
- [ ] 분석 confidence score 자동 계산
- [ ] Rate limiting Redis 연결 (로컬은 in-memory)
- [ ] 분석 결과 데이터베이스 저장

---

**버전**: 1.2.3-local  
**마지막 업데이트**: 2026-02-14 20:36:22 UTC  
**상태**: 🟢 In Development
