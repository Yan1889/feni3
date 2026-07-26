FROM node:latest AS react_builder
WORKDIR /build-dir
# dependencies first
COPY feni3-ui/package.json .
COPY feni3-ui/package-lock.json .
RUN npm install
# writes to dist/
COPY feni3-ui/ .
RUN npm run build

FROM amazoncorretto:21 AS java_builder
WORKDIR /build-dir
RUN dnf install -y findutils
# dependencies first
COPY feni3-api/gradle/ gradle/
COPY feni3-api/gradlew .
COPY feni3-api/build.gradle .
COPY feni3-api/settings.gradle .
RUN ./gradlew dependencies --no-daemon
# yields build/libs/feni3-0.0.1-SNAPSHOT.jar
COPY feni3-api .
COPY --from=react_builder /build-dir/dist src/main/resources/static/
RUN ./gradlew build --no-daemon

FROM amazoncorretto:21
WORKDIR /app
COPY --from=java_builder /build-dir/build/libs/feni3-0.0.1-SNAPSHOT.jar app.jar
COPY --from=java_builder /build-dir/train.sh train.sh
COPY --from=java_builder /build-dir/bus.sh bus.sh
RUN dnf install -y jq gawk
CMD [ "java", "-jar", "app.jar" ]
