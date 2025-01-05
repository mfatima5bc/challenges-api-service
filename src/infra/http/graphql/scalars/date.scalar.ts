import { CustomScalar, Scalar } from "@nestjs/graphql";
import { format, isValid, parseISO } from "date-fns";
import { Kind, ValueNode } from "graphql";

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Number | Date> {
  // parseValue: GraphQLScalarValueParser<Date>;
  // serialize: GraphQLScalarSerializer<number>;

  description = 'Date custom scalar type';

  parseValue(value): Number {
    const parsedDate = parseISO(value); // Converte a string para Date
    if (!isValid(parsedDate)) {
      throw new Error(`Invalid date format. Expected format: YYYY-MM-DD`);
    }
    return parsedDate.getTime(); // Retorna o timestamp
  }

  serialize(value): string {
    return format(new Date(value), "yyyy-MM-dd"); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    if (ast.kind === Kind.STRING) {
      return parseISO(ast.value); 
    }
    // const parsedDate = parseISO(ast.value);
    // if (!isValid(parsedDate)) {
    //   throw new Error(`Invalid date format. Expected format: YYYY-MM-DD`);
    // }
    // console.log(parsedDate, parsedDate.getTime())
    return null; // Retorna o timestamp
  }
}