using System;
using Xunit;
using Moq;
using Microsoft.Extensions.Logging;
using DoomMap.Entities;
using DoomMap.Services;
using DoomMap.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DoomMap.UnitTests
{
    public class FireControllerTests
    {
        [Fact]
        public async Task GetFire_WithMissingFire_ReturnNotFound()
        {
            // Arrange
            var contextStub = new Mock<DoomContext>();

            var iServiceStub = new Mock<IFireService>();
            iServiceStub.Setup(c => c.GetFireByID(It.IsAny<string>()))
                .ReturnsAsync((Fire)null);

            var loggerStub = new Mock<ILogger<FiresController>>();

            var controller = new FiresController(iServiceStub.Object, loggerStub.Object);


            // Act
            var result = await controller.GetFireByID("test");

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);



        }
    }
}
