import { z } from "zod";
import {schema} from "../../validationSchemas";

// interface structure is schema based.
type IssueInterface = z.infer<typeof schema>;

export default IssueInterface;
