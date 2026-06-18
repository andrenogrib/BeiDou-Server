This project is based on the localization and improvements derived from Cosmic. Cosmic repository: https://github.com/P0nk/Cosmic

# Origin of the name "BeiDou"
The BeiDou Navigation Satellite System (BDS, also known as COMPASS, Chinese transliteration: BeiDou) is a global satellite navigation system independently developed by China. It is the third mature satellite navigation system after GPS and GLONASS. The BeiDou Navigation Satellite System (BDS), together with the United States' GPS, Russia's GLONASS, and the European Union's GALILEO, is one of the providers recognized by the United Nations International Committee on Global Navigation Satellite Systems.
The BeiDou Navigation Satellite System consists of three parts: the space segment, the ground segment, and the user segment. It can provide all-weather, all-time, high-accuracy, and highly reliable positioning, navigation, and timing services to all kinds of users worldwide, and it also has short-message communication capability. After years of development, BeiDou has become an important new type of infrastructure that provides all-weather, all-time, high-accuracy positioning, navigation, and timing services to users around the globe. The BeiDou positioning, navigation, and timing service is provided free of charge to users worldwide through 30 satellites, with global horizontal positioning accuracy better than 9 meters, vertical positioning accuracy better than 10 meters, velocity measurement accuracy better than 0.2 m/s, and timing accuracy better than 20 nanoseconds.
The word "BeiDou" carries special significance for China. BeiDou is one of China's satellite navigation systems, and it was the first satellite navigation system independently developed by China. Since a fellow developer suggested that this project should also be named after a celestial body, after much thought we decided to call it BeiDou! This also means that what we set out to build must be even better and more powerful than HeavenMS and Cosmic!

# Development Progress
[Development Progress](https://github.com/BeiDouMS/BeiDou-Server/wiki/%E5%BC%80%E5%8F%91%E8%BF%9B%E5%BA%A6)

# gms-server (Server)
- Automatic database creation is implemented; the initialization SQL scripts are executed automatically, as long as MySQL is running.
- The API port 8686 is exposed.
- Swagger has been integrated. Swagger URL: http://localhost:8686/swagger-ui/index.html
- APIs are versioned, e.g. v1, v2, v3. The default Swagger tag is `name = ApiConstant.LATEST`, and the default RequestMapping is `"/" + ApiConstant.LATEST + "/xx"`.
- When adding a new API version where the interfaces do not need to change, simply point `ApiConstant.LATEST` to the new version. If some interfaces are not compatible, change both the `Tag` and the `RequestMapping` of the old interfaces to a specific version, e.g. `ApiConstant.V1`. For everything else, simply point `ApiConstant.LATEST` to the new version.
- Multiple languages are supported. Scripts and WZ files are read from different paths depending on the language: `wz-zh-CN`, `wz-en-US`, `script-zh-CN`, `script-en-US`.
- MySQL versions below 8 are not supported.

## Development Environment
- OpenJDK 21: https://jdk.java.net/archive/
- IntelliJ IDEA 2023.3 or later: https://www.jetbrains.com/idea/
- MySQL 8: https://github.com/SleepNap/NapMysqlTool/releases/latest or https://downloads.mysql.com/archives/community/
- Maven: https://maven.apache.org/download.cgi
- git: https://git-scm.com/downloads
- DBeaver: https://dbeaver.io/download/ or Navicat Lite: https://www.navicat.com/en/download/navicat-premium-lite

# gms-ui (Web Frontend)

## Setting Up the Development Environment

Feel free to skip any steps you have already completed, depending on your situation.

**1. Install NodeJS v20.15.0 (LTS version)**

Download: https://nodejs.org/dist/v20.15.0/node-v20.15.0-x64.msi

**2. Install Yarn**

```shell
npm install -g yarn
```

> If you get an error saying the `npm` command does not exist, it may be because the environment variables configured by the NodeJS installer have not taken effect yet. If you are new to this, try the classic fix: restart your computer.

**3. Initialize the frontend development environment**

Open a command line, navigate to the `gms-ui` directory, then run:

```shell
yarn install
```

**4. Start the development environment**

```shell
yarn dev
```

## Notes
All images in the web frontend are fetched online. Thanks to https://maplestory.io for providing the image API!

# Client
The server and client are already packaged and available in the [Releases](https://github.com/BeiDouMS/BeiDou-Server/releases) — just download them directly.
If you want to download the **early Beta version** of the BeiDou client, you can [click here to learn more](https://github.com/BeiDouMS/BeiDou-Server/wiki/%E5%8C%97%E6%96%97%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E5%B8%83).

# Docker
The Docker-related configuration has been removed from the original server and moved into a [separate repository](https://github.com/BeiDouMS/BeiDou-docker), which also supports [pulling prebuilt images](https://github.com/BeiDouMS/BeiDou-docker/pkgs/container/beidou-server-all). If you would like to contribute to Docker development, you are welcome to open PRs in the new repository.
[Learn more](https://github.com/BeiDouMS/BeiDou-docker)

# Wiki
We have found that most questions are already answered in the Wiki — feel free to take a look. If you run into a problem that is not covered in the Wiki, feel free to open an issue or add the missing information directly. The Wiki has been opened up so that anyone can edit it.
[Wiki](https://github.com/BeiDouMS/BeiDou-Server/wiki)
