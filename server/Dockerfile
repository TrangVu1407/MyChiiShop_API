# Sử dụng image Node 15
FROM node:15

# Đặt thư mục làm việc trong container
WORKDIR /usr/app

# Copy file package.json vào thư mục hiện tại của container
#COPY package.json ./

# Cài đặt các gói npm từ package.json
RUN npm install

# Cài đặt các gói global knex và knex-migrate
RUN npm install -g knex knex-migrate && knex --version

CMD ["../local.sh"]