const topics = [
  {
    category: "C / C++",
    quizzes: [
      ["C Basics", [
        ["Which function is the usual entry point of a C program?", ["start()", "main()", "run()", "init()"], 1],
        ["Which format specifier is used for an int in printf?", ["%c", "%f", "%d", "%s"], 2],
        ["Which operator gives the remainder?", ["/", "%", "*", "//"], 1]
      ]],
      ["C Control Flow", [
        ["Which loop checks its condition before the first iteration?", ["do-while", "while", "Both always execute once", "None"], 1],
        ["What does break do inside a loop?", ["Skips one iteration", "Exits the loop", "Restarts the loop", "Ends the program always"], 1],
        ["Which keyword skips to the next loop iteration?", ["stop", "exit", "continue", "pass"], 2]
      ]],
      ["C Functions", [
        ["What is a function prototype?", ["A function call", "A declaration describing a function", "A loop", "A header file"], 1],
        ["Which keyword returns a value from a function?", ["send", "return", "yield", "break"], 1],
        ["What is recursion?", ["A function calling itself", "A loop without a condition", "A pointer comparison", "A type conversion"], 0]
      ]],
      ["C Pointers", [
        ["Which operator obtains the address of a variable?", ["*", "&", "%", "#"], 1],
        ["What does a pointer store?", ["Only integers", "A memory address", "A function result only", "A file name"], 1],
        ["Which operator dereferences a pointer?", ["&", "*", "->>", "::"], 1]
      ]],
      ["C++ OOP", [
        ["Which feature lets a class derive from another class?", ["Encapsulation", "Inheritance", "Compilation", "Casting"], 1],
        ["Which symbol commonly terminates a C++ statement?", [":", ";", ".", ","], 1],
        ["Which keyword creates an object dynamically in C++?", ["alloc", "new", "make", "object"], 1]
      ]]
    ]
  },
  {
    category: "Java",
    quizzes: [
      ["Java Fundamentals", [
        ["Which method is the standard Java application entry point?", ["start()", "main()", "run()", "init()"], 1],
        ["Which type stores true or false?", ["int", "char", "boolean", "String"], 2],
        ["Which keyword creates an object?", ["class", "this", "new", "void"], 2]
      ]],
      ["Java OOP", [
        ["Which concept hides internal implementation details?", ["Encapsulation", "Iteration", "Compilation", "Indexing"], 0],
        ["Which keyword refers to the current object?", ["self", "this", "current", "superclass"], 1],
        ["A class implementing an interface uses which keyword?", ["extends", "implements", "inherits", "instanceof"], 1]
      ]],
      ["Java Inheritance", [
        ["Which keyword calls a superclass constructor or member?", ["this", "base", "super", "parent"], 2],
        ["Can a Java class directly extend two classes?", ["Yes, any number", "Yes, exactly two", "No, only one class", "Only if abstract"], 2],
        ["Method overloading means methods have:", ["Same name with different parameter lists", "Different names only", "Identical signatures only", "No parameters always"], 0]
      ]],
      ["Java Exceptions", [
        ["Which block is commonly used to handle an exception?", ["catch", "final", "throws-only", "implements"], 0],
        ["Which block is commonly used for cleanup after try/catch?", ["static", "finally", "package", "extends"], 1],
        ["Which keyword explicitly throws an exception object?", ["throws", "throw", "catch", "error"], 1]
      ]],
      ["Java Collections", [
        ["Which collection type does not allow duplicate elements?", ["List", "Set", "ArrayList", "LinkedList"], 1],
        ["Which interface represents key-value mappings?", ["Queue", "Map", "Set", "Iterator"], 1],
        ["Which collection is designed for indexed access and dynamic size?", ["ArrayList", "TreeSet", "HashMap", "PriorityQueue"], 0]
      ]]
    ]
  },
  {
    category: "DSA",
    quizzes: [
      ["Arrays and Complexity", [
        ["What is the usual time complexity of array index access?", ["O(1)", "O(log n)", "O(n)", "O(n²)"], 0],
        ["Which structure stores elements in contiguous indexed positions?", ["Stack only", "Array", "Graph", "Tree"], 1],
        ["What is the worst-case time complexity of linear search?", ["O(1)", "O(log n)", "O(n)", "O(n log n)"], 2]
      ]],
      ["Stacks and Queues", [
        ["A stack follows which principle?", ["FIFO", "LIFO", "Random order", "Sorted order"], 1],
        ["A queue follows which principle?", ["LIFO", "FIFO", "Last-index-first", "Priority always"], 1],
        ["Which operation removes the top stack item?", ["push", "pop", "peek", "enqueue"], 1]
      ]],
      ["Linked Lists", [
        ["A singly linked-list node usually stores:", ["Data and next pointer", "Only an index", "Two parent pointers", "Only a key"], 0],
        ["Which is a common advantage of linked lists over arrays?", ["Constant-time random access", "Easy insertion when node position is known", "Always less memory", "Automatic sorting"], 1],
        ["What does the last node's next pointer usually contain?", ["The first node always", "A null reference", "Its own data", "The list length"], 1]
      ]],
      ["Trees and BST", [
        ["In a binary tree, a node can have at most how many children?", ["1", "2", "3", "Unlimited"], 1],
        ["In a BST, values in the left subtree are conventionally:", ["Greater than the node", "Less than the node", "Always equal", "Unrelated"], 1],
        ["Which traversal of a BST visits keys in sorted order?", ["Preorder", "Inorder", "Postorder", "Level order only"], 1]
      ]],
      ["Searching and Sorting", [
        ["Binary search requires the data to be:", ["Sorted", "Reversed", "Stored in a stack", "Unique in all cases"], 0],
        ["What is the average time complexity of merge sort?", ["O(n)", "O(log n)", "O(n log n)", "O(n²)"], 2],
        ["Which algorithm repeatedly selects the smallest remaining element?", ["Selection sort", "Binary search", "Merge sort", "BFS"], 0]
      ]]
    ]
  },
  {
    category: "DBMS / SQL",
    quizzes: [
      ["SQL Fundamentals", [
        ["Which SQL command retrieves rows?", ["GET", "SELECT", "FETCH ALL ONLY", "OPEN"], 1],
        ["Which clause filters rows before grouping?", ["ORDER BY", "WHERE", "HAVING", "INTO"], 1],
        ["Which clause sorts query results?", ["SORT", "ORDER BY", "GROUP BY", "ARRANGE"], 1]
      ]],
      ["SQL Joins", [
        ["Which join returns matching rows from both tables?", ["INNER JOIN", "CROSS JOIN", "FULL JOIN only", "UNION"], 0],
        ["Which join preserves every row from the left table?", ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN only"], 1],
        ["A join condition commonly compares:", ["Related columns between tables", "Only table names", "Database passwords", "Indexes to comments"], 0]
      ]],
      ["Keys and Constraints", [
        ["Which key uniquely identifies each row in a table?", ["Foreign key", "Primary key", "Duplicate key", "Nullable key"], 1],
        ["A foreign key is mainly used to enforce:", ["Referential integrity", "Text formatting", "Sorting order", "Compression"], 0],
        ["Which constraint prevents duplicate values in a column or column set?", ["UNIQUE", "DEFAULT", "CHECK only", "ORDER"], 0]
      ]],
      ["Normalization", [
        ["Which normal form removes partial dependency on part of a candidate key?", ["1NF", "2NF", "3NF", "4NF"], 1],
        ["Normalization mainly helps reduce:", ["Data redundancy and anomalies", "All query costs to zero", "Every table to one row", "The need for keys"], 0],
        ["A functional dependency X → Y means X determines:", ["Y", "Only X", "The table name", "The number of indexes"], 0]
      ]],
      ["Transactions and Indexes", [
        ["What does ACID's Atomicity mean?", ["All-or-nothing transaction behavior", "Data is always sorted", "Transactions never fail", "Only one table exists"], 0],
        ["What is a common purpose of a database index?", ["Speed up lookups", "Replace all constraints", "Encrypt every row", "Prevent all updates"], 0],
        ["Which command commonly makes a transaction's changes permanent?", ["ROLLBACK", "COMMIT", "UNDO ALL", "DROP"], 1]
      ]]
    ]
  },
  {
    category: "Web Development",
    quizzes: [
      ["HTML Fundamentals", [
        ["Which element creates a hyperlink?", ["<link>", "<a>", "<href>", "<url>"], 1],
        ["Which element represents the largest standard heading?", ["<h6>", "<head>", "<h1>", "<title>"], 2],
        ["Which attribute provides alternative text for an image?", ["src", "href", "alt", "target"], 2]
      ]],
      ["CSS Fundamentals", [
        ["Which CSS property changes text color?", ["font-style", "color", "background-image", "text-align"], 1],
        ["Which selector targets an element by its ID?", [".header", "#header", "*header", "header()"], 1],
        ["Which layout system is designed for one-dimensional row or column layouts?", ["Flexbox", "SQL", "DOM", "HTTP"], 0]
      ]],
      ["JavaScript Basics", [
        ["Which keyword declares a block-scoped variable that can be reassigned?", ["const", "let", "static", "define"], 1],
        ["Which operator checks strict equality in JavaScript?", ["=", "==", "===", "!="], 2],
        ["Which method converts a JSON string into a JavaScript value?", ["JSON.parse()", "JSON.stringify()", "JSON.read()", "parse.HTML()"], 0]
      ]],
      ["Frontend and DOM", [
        ["What does DOM stand for?", ["Document Object Model", "Data Order Method", "Display Output Mode", "Document Oriented Memory"], 0],
        ["Which method selects an element using a CSS selector?", ["document.querySelector()", "document.fetchCSS()", "window.findNode()", "element.sql()"], 0],
        ["Which event commonly fires when a user clicks a button?", ["submit-only", "click", "compile", "install"], 1]
      ]],
      ["Backend and APIs", [
        ["What is an API commonly used for?", ["Communication between software components", "Styling headings", "Increasing monitor brightness", "Replacing all databases"], 0],
        ["Which HTTP method is commonly used to retrieve a resource?", ["GET", "PATCH only", "DELETE", "CONNECT only"], 0],
        ["What does JSON commonly represent?", ["Structured data", "CSS layout", "A compiled executable", "A database server"], 0]
      ]]
    ]
  },
  {
    category: "Placement Aptitude",
    quizzes: [
      ["Number System", [
        ["What is the HCF of 18 and 24?", ["3", "6", "9", "12"], 1],
        ["What is 25% of 240?", ["40", "50", "60", "80"], 2],
        ["What is the least common multiple of 6 and 8?", ["12", "18", "24", "48"], 2]
      ]],
      ["Ratio and Percentage", [
        ["A ratio is 2:3 and the total is 25. What is the first share?", ["5", "10", "12", "15"], 1],
        ["A price of ₹800 increases by 10%. What is the new price?", ["₹810", "₹840", "₹880", "₹900"], 2],
        ["A student scores 45 out of 60. What percentage is that?", ["65%", "70%", "75%", "80%"], 2]
      ]],
      ["Time and Work", [
        ["A person completes a job in 6 days at a constant rate. What fraction is completed per day?", ["1/3", "1/6", "1/12", "6"], 1],
        ["If 4 workers finish a job in 8 days at the same rate, how many worker-days are needed?", ["12", "16", "24", "32"], 3],
        ["A can finish a job in 10 days. How much is completed in 5 days at a constant rate?", ["1/5", "1/4", "1/2", "3/4"], 2]
      ]],
      ["Speed and Distance", [
        ["A vehicle travels 120 km in 3 hours. What is its average speed?", ["30 km/h", "40 km/h", "60 km/h", "90 km/h"], 1],
        ["How far does a vehicle travel at 50 km/h in 2 hours?", ["25 km", "50 km", "100 km", "150 km"], 2],
        ["How long does a 180 km journey take at 60 km/h?", ["2 hours", "3 hours", "4 hours", "6 hours"], 1]
      ]],
      ["Logical Reasoning", [
        ["Find the next number: 2, 4, 8, 16, __.", ["18", "24", "30", "32"], 3],
        ["If all roses are flowers, which statement must be true?", ["All flowers are roses", "Every rose is a flower", "No rose is a flower", "Every flower is red"], 1],
        ["Find the odd one out.", ["Triangle", "Square", "Circle", "Carrot"], 3]
      ]]
    ]
  },
  {
    category: "Python",
    quizzes: [
      ["Python Basics", [
        ["Which symbol starts a single-line comment in Python?", ["//", "#", "/*", "--"], 1],
        ["Which type is immutable?", ["list", "dict", "set", "tuple"], 3],
        ["Which function returns the number of items in a sequence?", ["size()", "count_all()", "len()", "length"], 2]
      ]],
      ["Python Collections", [
        ["Which structure stores key-value pairs?", ["tuple", "dict", "set", "str"], 1],
        ["Which list method adds an item to the end?", ["append()", "insert_end_only()", "push_back()", "attach()"], 0],
        ["What is the index of the first element in a Python list?", ["-1", "0", "1", "Depends on its length"], 1]
      ]],
      ["Python Functions", [
        ["Which keyword defines a function?", ["func", "def", "function", "method"], 1],
        ["Which keyword sends a value back from a function?", ["yield-only", "return", "break", "pass"], 1],
        ["What does a default argument provide?", ["A fallback value when omitted", "A mandatory exception", "A global variable", "A loop condition"], 0]
      ]],
      ["Python Control Flow", [
        ["Which keyword begins a conditional branch?", ["when", "if", "case-only", "choose"], 1],
        ["Which loop iterates over items in an iterable?", ["foreach only", "for", "repeat-until", "iterate"], 1],
        ["What does range(3) produce when iterated?", ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3 only"], 1]
      ]],
      ["Python Errors and Files", [
        ["Which block handles an exception?", ["except", "catch", "handle", "rescue"], 0],
        ["Which file mode commonly opens a file for reading text?", ["'w'", "'r'", "'a'", "'x'"], 1],
        ["What does a with statement help with when using files?", ["Managing resource cleanup", "Sorting file contents automatically", "Encrypting every file", "Compiling Python"], 0]
      ]]
    ]
  },
  {
    category: "Operating Systems",
    quizzes: [
      ["OS Fundamentals", [
        ["What is a main role of an operating system?", ["Manage hardware and software resources", "Only design websites", "Only compile Java", "Only store images"], 0],
        ["Which is an example of an operating system?", ["Linux", "MySQL", "HTML", "HTTP"], 0],
        ["A process is best described as:", ["A program in execution", "A CSS selector", "A database column", "A network cable"], 0]
      ]],
      ["Process Management", [
        ["Which state means a process is waiting for CPU time?", ["Ready", "Terminated", "New only", "Exited"], 0],
        ["Which scheduler selects a process from the ready queue for CPU execution?", ["CPU/short-term scheduler", "Text editor", "Linker", "File compressor"], 0],
        ["A context switch involves:", ["Saving and restoring execution state", "Changing HTML colors", "Deleting the OS", "Formatting SQL"], 0]
      ]],
      ["Memory Management", [
        ["What does virtual memory provide?", ["An abstraction of memory beyond physical RAM", "Unlimited physical RAM", "A replacement for the CPU", "Only file encryption"], 0],
        ["Paging divides memory into fixed-size:", ["Pages and frames", "Classes and objects", "Rows and columns only", "Threads and sockets"], 0],
        ["What is a page fault?", ["A referenced page is not currently mapped in RAM as needed", "A syntax error in HTML", "A failed SQL join", "A CPU temperature warning"], 0]
      ]],
      ["Deadlocks", [
        ["Deadlock means processes are:", ["Waiting indefinitely for resources held by one another", "Always running faster", "Finished successfully", "Sorting data"], 0],
        ["Which is one of the classic necessary conditions for deadlock?", ["Circular wait", "Infinite RAM", "Perfect scheduling", "No resource sharing"], 0],
        ["Which approach can help avoid deadlock by checking safe states?", ["Banker's algorithm", "Binary search", "Merge sort", "DNS lookup"], 0]
      ]],
      ["CPU Scheduling", [
        ["Which scheduling method uses a time quantum?", ["Round Robin", "FCFS only", "Non-preemptive SJF only", "FIFO page replacement"], 0],
        ["FCFS stands for:", ["First Come, First Served", "Fast CPU, Fast Storage", "First Class, First System", "File Control, File Save"], 0],
        ["Which metric measures time spent waiting in the ready queue?", ["Waiting time", "Turnaround only", "Page size", "Clock rate"], 0]
      ]]
    ]
  },
  {
    category: "Computer Networks",
    quizzes: [
      ["Network Fundamentals", [
        ["What does LAN stand for?", ["Local Area Network", "Large Access Node", "Linked Application Name", "Long Address Number"], 0],
        ["Which device forwards packets between networks?", ["Router", "Keyboard", "Compiler", "Printer only"], 0],
        ["Which protocol is commonly used to resolve domain names to IP addresses?", ["DNS", "HTML", "FTP only", "CSS"], 0]
      ]],
      ["TCP and UDP", [
        ["Which transport protocol provides a reliable ordered byte stream?", ["UDP", "TCP", "IP only", "ARP"], 1],
        ["Which protocol is connectionless at the transport layer?", ["TCP", "UDP", "TLS", "SSH"], 1],
        ["Which protocol is often preferred for low-latency real-time media when some loss is acceptable?", ["UDP", "TCP only", "SMTP", "POP3"], 0]
      ]],
      ["IP Addressing", [
        ["How many bits are in an IPv4 address?", ["16", "32", "64", "128"], 1],
        ["How many bits are in an IPv6 address?", ["32", "64", "96", "128"], 3],
        ["Which address is a private IPv4 address?", ["8.8.8.8", "192.168.1.10", "1.1.1.1", "203.0.113.5"], 1]
      ]],
      ["HTTP and Web", [
        ["What does HTTPS add to HTTP?", ["TLS-based transport security", "Automatic database normalization", "CSS rendering", "A faster CPU"], 0],
        ["Which status code commonly means Not Found?", ["200", "301", "404", "500"], 2],
        ["Which HTTP method is typically safe and used to retrieve a resource?", ["GET", "DELETE", "PATCH", "POST"], 0]
      ]],
      ["Network Models", [
        ["Which OSI layer routes packets between networks?", ["Physical", "Network", "Presentation", "Session"], 1],
        ["Which OSI layer is responsible for end-to-end transport services?", ["Transport", "Physical", "Data Link", "Presentation"], 0],
        ["Ethernet is commonly associated with which OSI layer?", ["Application", "Data Link", "Session", "Presentation"], 1]
      ]]
    ]
  },
  {
    category: "Software Engineering",
    quizzes: [
      ["Software Development", [
        ["What is the main purpose of requirements analysis?", ["Understand what the system must do", "Choose font colors only", "Skip user needs", "Remove all testing"], 0],
        ["Which activity checks software against expected behavior?", ["Testing", "Minification only", "Formatting only", "Renaming"], 0],
        ["What is version control used for?", ["Track changes to files over time", "Replace all backups automatically", "Compile every language", "Host databases only"], 0]
      ]],
      ["Testing Basics", [
        ["Unit testing focuses on:", ["Small individual components", "The entire company", "Network cables only", "User passwords only"], 0],
        ["Integration testing checks:", ["Interactions between components", "Only spelling", "Only screen resolution", "Only source formatting"], 0],
        ["A regression test checks whether:", ["Previously working behavior still works after changes", "Every feature is new", "The CPU is upgraded", "The database is empty"], 0]
      ]],
      ["Git Basics", [
        ["Which command creates a new Git commit?", ["git save", "git commit", "git push only", "git upload"], 1],
        ["Which command downloads remote updates without merging them into the current branch?", ["git fetch", "git commit", "git init", "git status"], 0],
        ["Which command shows the working-tree state?", ["git status", "git clone", "git reset --hard", "git clean"], 0]
      ]],
      ["Agile and Scrum", [
        ["In Scrum, a sprint is:", ["A fixed-length work period", "A database table", "A programming language", "A network protocol"], 0],
        ["Who prioritizes the product backlog in Scrum?", ["Product Owner", "Compiler", "Database server", "End user only in every case"], 0],
        ["What is the purpose of a retrospective?", ["Reflect and improve the team's process", "Deploy without testing", "Delete the backlog", "Replace version control"], 0]
      ]],
      ["Design and Maintenance", [
        ["What does modularity encourage?", ["Breaking a system into manageable components", "Putting all code in one function", "Removing interfaces", "Duplicating every feature"], 0],
        ["Code review is mainly used to:", ["Inspect changes and improve quality", "Guarantee no bugs can ever exist", "Replace all tests", "Hide changes from teammates"], 0],
        ["Technical debt refers to:", ["Future cost created by expedient technical choices", "Money spent on a laptop only", "Database storage capacity", "A required license fee"], 0]
      ]]
    ]
  }
];

const quizBank = {};

for (const topic of topics) {
  for (const [title, questions] of topic.quizzes) {
    const key = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    quizBank[key] = {
      key,
      title,
      category: topic.category,
      questions: questions.map(([question, options, answer]) => ({
        question,
        options,
        answer
      }))
    };
  }
}


const hardQuestionOverrides = {
  "c-pointers": [
    ["What is printed? int a[] = {10,20,30}; int *p = a; printf(\"%d\", *(p+2));", ["10", "20", "30", "Address of a"], 2],
    ["Given int x=5; int *p=&x; *p=9; what is x?", ["5", "9", "Address of x", "Undefined because p is a pointer"], 1],
    ["For int a[]={4,7,9}; int *p=a; what is p[1]?", ["4", "7", "9", "Address of a[1]"], 1],
    ["Which declaration makes p a pointer to a constant int?", ["int *const p", "const int *p", "int const p", "int **const p"], 1],
    ["If int x=8; int *p=&x; int **q=&p; what does **q evaluate to?", ["Address of x", "Address of p", "8", "Undefined in every case"], 2]
  ],
  "c-oop": [
    ["In C++, class Base { public: virtual int f(){return 1;} }; class Derived: public Base { public: int f() override {return 2;} }; Base* p=new Derived; what does p->f() return?", ["1", "2", "Compilation error", "Depends on pointer size"], 1],
    ["A base-class pointer points to a derived object. Which feature enables the overridden method to be selected at runtime?", ["Function overloading", "Virtual dispatch", "Friend declaration", "Constructor chaining alone"], 1],
    ["If class D publicly inherits B, which statement best describes the relationship?", ["Every B object is a D object", "A D object can be used where a B is expected", "B automatically contains a D object", "Public inheritance prevents polymorphism"], 1],
    ["Why should a polymorphic base class often have a virtual destructor?", ["To make constructors virtual", "To ensure derived cleanup when deleting through a base pointer", "To prevent overriding", "To avoid all memory allocation"], 1],
    ["A class has a private data member balance. What is the strongest reason to expose a public deposit() method instead of the member itself?", ["It guarantees the object uses less memory", "It can enforce rules while changing state", "It makes the class a global variable", "It removes the need for constructors"], 1]
  ],
  "java-exceptions": [
    ["What is printed? try { System.out.print(\"A\"); throw new RuntimeException(); } catch(RuntimeException e) { System.out.print(\"B\"); } finally { System.out.print(\"C\"); }", ["A", "AB", "ABC", "AC"], 2],
    ["A method calls a method that declares IOException. Which action can satisfy Java's checked-exception rules?", ["Ignore it in all cases", "Catch it or declare it with throws", "Replace it with finally", "Only rename the method"], 1],
    ["What happens when a catch(Exception e) appears before catch(IOException e) in the same try statement?", ["Both handlers run", "The IOException catch is unreachable", "The code compiles and IOException is caught first", "IOException becomes unchecked"], 1],
    ["A return statement executes inside try, and finally prints a message without returning or throwing. What normally happens?", ["finally is skipped", "finally runs before the method returns", "catch must run first", "The return value is always discarded"], 1],
    ["Which statement about try-with-resources is correct for an AutoCloseable resource?", ["It closes the resource when control leaves the construct", "It closes the resource only if an exception occurs", "It suppresses every exception", "It works only with file names as strings"], 0]
  ],
  "java-collections": [
    ["What is printed? List<Integer> x = new ArrayList<>(Arrays.asList(2,3,2)); Set<Integer> s = new HashSet<>(x); System.out.print(x.size()+\"/\"+s.size());", ["3/3", "3/2", "2/3", "2/2"], 1],
    ["A HashMap uses a custom key class whose equals() compares fields but whose hashCode() is inconsistent with those fields. What can happen?", ["All lookups are guaranteed to succeed", "Equal keys can be placed in different hash buckets, breaking expected map behavior", "The map automatically repairs hashCode()", "The code cannot compile"], 1],
    ["Which collection is generally appropriate when keys must remain sorted by their natural ordering?", ["HashMap", "TreeMap", "ArrayDeque", "LinkedList"], 1],
    ["What does an Iterator's remove() method normally remove?", ["The next element in every collection", "The last element returned by that iterator, when supported", "Every duplicate element", "The collection's first element only"], 1],
    ["A program frequently checks whether an element exists in a HashSet. Under well-distributed hashes, expected lookup time is generally:", ["O(1)", "O(log n) in every case", "O(n log n)", "O(n²)"], 0]
  ],
  "linked-lists": [
    ["A singly linked list has head pointing to 10 -> 20 -> 30 -> null. After inserting 15 after node 10, what is the order?", ["10 -> 20 -> 15 -> 30", "15 -> 10 -> 20 -> 30", "10 -> 15 -> 20 -> 30", "10 -> 20 -> 30 -> 15"], 2],
    ["You have a pointer to a node in a singly linked list, but not its predecessor. Why is deleting that node generally not a simple constant-time operation?", ["The list must always be sorted", "The predecessor's next link normally must be updated", "Every node stores its index", "Deletion requires binary search"], 1],
    ["Slow and fast pointers start at the head of a finite singly linked list. What can this technique detect when the fast pointer advances two steps and the slow one one step?", ["Whether values are sorted", "Whether the list contains a cycle", "The minimum value in one pass", "Whether every node has two children"], 1],
    ["You reverse a singly linked list iteratively. Which references are normally needed to avoid losing the remaining list while reversing links?", ["Only head", "Previous, current, and next", "Only tail and array index", "Parent and grandparent"], 1],
    ["A singly linked list has no tail pointer. What is the time complexity of appending a node at the end when the list has n nodes?", ["O(1) for every list size", "O(log n)", "O(n)", "O(n²)"], 2]
  ]
};

for (const [key, questions] of Object.entries(hardQuestionOverrides)) {
  if (!quizBank[key]) throw new Error("Missing quiz key: " + key);
  quizBank[key].questions = questions.map(([question, options, answer]) => ({
    question, options, answer
  }));
}

module.exports = quizBank;
