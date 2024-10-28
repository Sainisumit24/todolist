#include <iostream>
#include <fstream>
#include <string>
using namespace std;

class Node {
public:
    string task;
    string mark;
    Node* next;
    Node() {
        this->mark = "Not Done";
        this->next = NULL;
    }
};

// Function to generate the HTML for the task list and write to file
void printHTML(Node* &head, int &num) {
    ofstream file("output.html"); // Create HTML file

    file << "<!DOCTYPE html><html><head>";
    file << "<link rel='stylesheet' type='text/css' href='styles.css'>";  // Link to external CSS
    file << "<title>To-Do List</title>";
    file << "</head><body>";

    file << "<h1>To-Do List</h1>";

    // Simulate a form for task input (but actual input happens in C++)
    file << "<form>";
    file << "<label for='task'>Enter a new task: </label>";
    file << "<input type='text' id='task' name='task' disabled>";  // Disabled as real input happens in the console
    file << "<button type='submit' disabled>Add Task</button>";  // Simulated button for form submission
    file << "</form>";

    file << "<table class='task-table'><tr><th>No.</th><th>Status</th><th>Task</th></tr>";

    num = 0;
    Node* print = head;
    while (print != NULL) {
        num++;
        file << "<tr><td>" << num << "</td>";
        file << "<td class='" << (print->mark == "Done" ? "done" : "not-done") << "'>" << print->mark << "</td>";
        file << "<td>" << print->task << "</td></tr>";
        print = print->next;
    }

    file << "</table>";
    file << "</body></html>";
    file.close(); // Close the file

    // Open the generated file in the default browser
    system("start output.html"); // For Windows
    // system("open output.html"); // For macOS
    // system("xdg-open output.html"); // For Linux
}

// Adding a task to the list
void add(Node* &head, Node* &tail) {
    Node* New = new Node();
    string taskDescription;

    cout << "Enter Your Task: ";
    cin.ignore();
    getline(cin, taskDescription);

    New->task = taskDescription;
    if (head == NULL) {
        head = New;
        tail = New;
    } else {
        tail->next = New;
        tail = New;
    }
}

int main() {
    int num;
    Node* head = NULL;
    Node* tail = NULL;
    char addMore;

    // Add tasks from user
    do {
        add(head, tail);
        cout << "Do you want to add another task? (y/n): ";
        cin >> addMore;
    } while (addMore == 'y' || addMore == 'Y');

    // Output the To-Do list as an HTML page and open it
    printHTML(head, num);

    return 0;
}
