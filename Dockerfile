# ---- Vaihe 1: Build React-app ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Vaihe 2: Serve nginx:llä ----
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# cd ~/Art_Club
# docker compose up --build      # Rakenna ja käynnistä (ensimmäinen kerta)
# docker compose up              # Käynnistä (ilman rebuild)
# docker compose down            # Pysäytä ja poista kontit
# docker compose logs -f backend # Seuraa backend-lokeja reaaliajassa
# docker compose logs -f frontend
# docker ps                      # Listaa käynnissä olevat kontit
# docker images                  # Listaa rakennetut imaget