# Build stage
FROM denoland/deno:latest AS builder
WORKDIR /app
COPY . .

# Install dependencies
RUN deno install
RUN deno task fetch
RUN deno task build

# Production stage
FROM denoland/deno:latest
WORKDIR /app
COPY --from=builder /app .
CMD ["deno", "task", "start"]

