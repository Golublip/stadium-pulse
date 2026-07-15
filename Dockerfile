FROM python:3.9-slim

# Prevent python from writing pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy all project files
COPY . .

# Expose port
EXPOSE 8080

# Run the python server script
CMD ["python", "run.py"]
