#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
#RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -yq nodejs build-essential
#
#FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
#RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
#RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -yq nodejs build-essential
#WORKDIR /src
#COPY ["DoomMap/DoomMap.csproj", "DoomMap/"]
#RUN dotnet restore "DoomMap/DoomMap.csproj"
#COPY . .
#WORKDIR "/src/DoomMap"
#RUN dotnet build "DoomMap.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "DoomMap.csproj" -c Release -o /app/publish
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "DoomMap.dll"]

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim  AS build
# Use native linux file polling for better performance
ENV DOTNET_USE_POLLING_FILE_WATCHER 1
WORKDIR /app
ENTRYPOINT dotnet watch run --urls=http://+:5000