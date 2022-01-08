using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QueueProject.Migrations
{
    public partial class fix1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("7bd8b8e8-daa7-414a-a9dd-6b93b73740a0"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("94c67fc1-7bd5-4e96-8594-ff734b8b0241"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("f1a96efa-8b38-41de-ac3c-2431560178e7"));

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: new Guid("9988ef77-1b6f-4c7c-85b8-8d43c276f060"));

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: new Guid("e19c1559-ddb6-4201-963a-41825a2a3ff7"));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Places",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Places",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("6ae6d7f9-67ce-48dc-8d5c-3b488357f9e2"), "User" },
                    { new Guid("8547173e-0a6c-46d3-95c1-d9ca793d40b8"), "Admin" },
                    { new Guid("cc1f8788-91b5-4c45-b150-6a3ec917576b"), "PlaceOwner" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("95b47c8e-80ef-453c-aeb4-e42b7965becb"), "Use" },
                    { new Guid("a5b75808-c6bf-41b1-aebc-725bf6e3f0f1"), "In queue" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("6ae6d7f9-67ce-48dc-8d5c-3b488357f9e2"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("8547173e-0a6c-46d3-95c1-d9ca793d40b8"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("cc1f8788-91b5-4c45-b150-6a3ec917576b"));

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: new Guid("95b47c8e-80ef-453c-aeb4-e42b7965becb"));

            migrationBuilder.DeleteData(
                table: "Statuses",
                keyColumn: "Id",
                keyValue: new Guid("a5b75808-c6bf-41b1-aebc-725bf6e3f0f1"));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Places",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Places",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(30)",
                oldMaxLength: 30);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("7bd8b8e8-daa7-414a-a9dd-6b93b73740a0"), "Admin" },
                    { new Guid("94c67fc1-7bd5-4e96-8594-ff734b8b0241"), "User" },
                    { new Guid("f1a96efa-8b38-41de-ac3c-2431560178e7"), "PlaceOwner" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("9988ef77-1b6f-4c7c-85b8-8d43c276f060"), "In queue" },
                    { new Guid("e19c1559-ddb6-4201-963a-41825a2a3ff7"), "Use" }
                });
        }
    }
}
