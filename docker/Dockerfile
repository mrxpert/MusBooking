# Используем готовый образ Playwright
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Создаём пользователя pwuser, если он не существует
RUN id -u pwuser &>/dev/null || useradd -m pwuser

# Создаём директории для результатов
RUN mkdir -p /app/playwright-report
RUN mkdir -p /home/pwuser/test-results

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json из корня проекта
COPY ../package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код из корня проекта
COPY ../ .

# Выдаем права на папку для пользователя
RUN chown -R pwuser:pwuser /app/playwright-report
RUN chown -R pwuser:pwuser /home/pwuser/test-results

# Устанавливаем Playwright и браузеры
RUN npx playwright install

# Переключаемся на пользователя pwuser
USER pwuser

# Указываем, что контейнер будет запускать интерактивную оболочку
ENTRYPOINT ["/bin/bash"]