FROM python:3.11-slim AS build


# Install deps and create non root usr
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev openssl && \
    rm -rf /var/lib/apt/lists/* && \
    groupadd -g 2000 appgroup && \
    useradd -m -u 1001 -g appgroup -d /app -s /bin/bash appusr 

WORKDIR /dir


COPY requirements.txt .

# Installing requirements inside a custom path instead of a installing user's home directory
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt 


COPY --chown=appusr:appgroup . .

# Stage 2: lightest image, provided by google
FROM python:3.11-slim

# for prod
WORKDIR /app

COPY --from=build --chown=appusr:appgroup /install /usr/local

COPY --from=build --chown=appusr:appgroup /dir .

#root < UID 0-1000; non root UID > 1000
USER 1001 
ENV PYTHONPATH=/app
ENV PYTHONPATH="app:{PYTHONPATH:-}"
EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["app.py"]  