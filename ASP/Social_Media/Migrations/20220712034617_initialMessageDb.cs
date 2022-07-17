using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Social_Media.Migrations
{
    public partial class initialMessageDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MessageClass");

            migrationBuilder.AddColumn<int>(
                name: "sorting_number",
                table: "MessagesClass",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "sorting_number",
                table: "MessagesClass");

            migrationBuilder.CreateTable(
                name: "MessageClass",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MessageReceiverId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MessageSenderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageClass", x => x.Id);
                });
        }
    }
}
