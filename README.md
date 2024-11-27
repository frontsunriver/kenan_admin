# [Kenan Admin]
 Kenan Admin - Next.js Admin Dashboard created by [FrontSunriver](https://github.com/frontsunriver) and available on Github

## How to use Kenan Admin?

Clone the Kenan Admin Repo(This repository is private repository):
```
git clone https://github.com/frontsunriver/kenan_admin.git
```
```
cd kenan_admin
```

##  🚀 Getting Started 

### Installation 👨🏻‍💻

1. Install all packages

```
npm install -g yarn
```
```
yarn install
```

2. Check configuration

###### First you need to check the configuration [/config/constant.js] and confirm the [product_mode] variable.

###### If product mode is 0 it's development mode and if product mode is 1 it's production mode.

3. Run your project

```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


4. Build your project

```
npm run build
```

## Kenan Admin server deploy mode [Linux(Ubuntu)]

1. Install NVM

```
sudo su
```

```
apt-get install curl
```

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

```
source ~/.bashrc
```

2. Install Node.js

```
nvm install 20.18.0
```

```
nvm use 20.18.0
```

3. Download project and install packages [product_mode=1].

```
git clone https://github.com/frontsunriver/kenan_admin.git
```

```
cd kenan_admin
```

```
npm install -g yarn
```

```
yarn install
```

## Technical Support or Questions
If you have questions or need help integrating the product please [contact me](https://t.me/sunriver0217).
